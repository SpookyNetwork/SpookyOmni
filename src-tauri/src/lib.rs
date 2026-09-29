mod safety_governor;
mod state_manager;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn execute_native_command(command: String) -> Result<String, String> {
    // This is a bridge for the Omni-Client LiquidTerminal
    // It safely proxies bash commands to the local host machine, enforcing sovereignty
    // In production, this must be gated by FaceID/Biometrics on iOS, or Local Admin on Desktop
    
    use std::process::Command;
    
    let output = if cfg!(target_os = "windows") {
        Command::new("powershell")
            .args(["-Command", &command])
            .output()
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(&command)
            .output()
    };

    match output {
        Ok(out) => {
            let stdout = String::from_utf8_lossy(&out.stdout).to_string();
            let stderr = String::from_utf8_lossy(&out.stderr).to_string();
            if !stderr.is_empty() {
                Ok(format!("{}\n{}", stdout, stderr))
            } else {
                Ok(stdout)
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
async fn fetch_notion_telemetry(token: String, db_id: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let res = client.post(format!("https://api.notion.com/v1/databases/{}/query", db_id))
        .header("Authorization", format!("Bearer {}", token))
        .header("Notion-Version", "2022-06-28")
        .send().await.map_err(|e| e.to_string())?;
    res.text().await.map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            execute_native_command,
            fetch_notion_telemetry,
            safety_governor::validate_trade_execution,
            state_manager::save_app_state
        ])
        .setup(|_app| {
            // THE GHOST_LOG SNAPSHOT (Every 60s)
            tauri::async_runtime::spawn(async move {
                let mut interval = tokio::time::interval(std::time::Duration::from_secs(60));
                loop {
                    interval.tick().await;
                    // State snapshot logic is driven from the frontend via save_app_state
                    // This loop ensures the runtime stays warm for async operations
                    let snapshot_path = "C:/Users/miker/Documents/SpookySystem/SpookyBrain/logs/snapshot_heartbeat.log";
                    let timestamp = chrono::Local::now().format("%Y-%m-%dT%H:%M:%S").to_string();
                    let _ = std::fs::write(snapshot_path, format!("GHOST_LOG_HEARTBEAT: {}", timestamp));
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
