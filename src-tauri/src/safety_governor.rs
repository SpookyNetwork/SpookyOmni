use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SafetyRiskParams {
    pub max_drawdown_percent: f64,
    pub panic_sell_threshold: f64,
    pub max_slippage_bps: u32,
}

impl Default for SafetyRiskParams {
    fn default() -> Self {
        Self {
            max_drawdown_percent: 5.0, // 5% portfolio dropdown triggers global freeze
            panic_sell_threshold: 15.0, // 15% immediate asset plunge triggers liquidation
            max_slippage_bps: 50,      // Terminate routine if spread exceeds 50 BPS
        }
    }
}

/// The "Kill-Switch" Execution Hook
/// If this returns an Error, it entirely bypasses the UI and blocks trading logic at the native layer.
#[tauri::command]
pub async fn validate_trade_execution(
    asset: String,
    drawdown: f64,
    current_volatility: f64,
) -> Result<String, String> {
    let limits = SafetyRiskParams::default();

    if drawdown > limits.max_drawdown_percent {
        return Err(format!(
            "KRAKEN_HALT: Maximum drawdown exceeded. Risk limit: {}%. Current Drop: {}%",
            limits.max_drawdown_percent, drawdown
        ));
    }

    if current_volatility > limits.panic_sell_threshold {
        return Err(format!(
            "KRAKEN_PANIC_SELL: Market volatility for {} exceeded {}%. Immediate risk abatement required.",
            asset, limits.panic_sell_threshold
        ));
    }

    Ok(format!("{} trade validated within secure risk boundaries.", asset))
}
