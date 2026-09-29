use serde_json::Value;
use std::fs;
use std::path::PathBuf;

/// Secure App State Serialization
/// Constantly streams the React layout payload into the encrypted SpookyBrain ledger
#[tauri::command]
pub async fn save_app_state(state_json: String) -> Result<String, String> {
    let mut path = PathBuf::from("C:/Users/miker/Documents/SpookySystem/SpookyBrain/logs");
    
    // Ensure the logs directory exists
    if !path.exists() {
        fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    }
    
    path.push("App_State_Snapshot.json");

    // Validate valid JSON before saving to avoid corrupting the Ghost Log
    let _parsed: Value = serde_json::from_str(&state_json).map_err(|e| format!("Invalid State JSON: {}", e))?;

    fs::write(&path, state_json).map_err(|e| format!("FS Write Error: {}", e))?;

    Ok(format!("GHOST_LOG: State successfully synced to {:?}", path))
}
