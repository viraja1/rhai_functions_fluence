use fluence::sdk::*;

extern crate rhai;
use rhai::{Engine, RegisterFn, Scope};
use serde_json::json;
use std::cell::RefCell;

fn factorial(x: i64) -> i64 {
    if x == 1 { return 1; }
    x * factorial(x - 1)
}

thread_local!{
    static global_engine: RefCell<Engine> = RefCell::new(Engine::new());
    static global_scope: RefCell<Scope> = RefCell::new(Vec::new());
}


#[invocation_handler()]
fn main(code: String) -> String {
    global_engine.with(|g| {
        global_scope.with(|s| {
            let mut engine = g.borrow_mut();
            let mut scope = s.borrow_mut();
            engine.register_fn("factorial", factorial);

            if let Ok(result) = engine.eval_with_scope::<i64>(&mut scope, &code) {
                let item = json!({
                    "result": result
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            if let Ok(result) = engine.eval_with_scope::<f64>(&mut scope, &code) {
                let item = json!({
                    "result": result
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            if let Ok(result) = engine.eval_with_scope::<bool>(&mut scope, &code) {
                let item = json!({
                    "result": result
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            if let Ok(result) = engine.eval_with_scope::<()>(&mut scope, &code) {
                let item = json!({
                    "result": ""
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            if let Ok(result) = engine.eval_with_scope::<String>(&mut scope, &code) {
                let item = json!({
                    "result": result
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            if let Err(e) = engine.eval_with_scope::<String>(&mut scope, &code){
                let item = json!({
                    "error": e.to_string()
                });
                let response = serde_json::to_string(&item).unwrap();
                return response;
            }
            let item = json!({
                "error": "Error occured".to_string()
            });
            let response = serde_json::to_string(&item).unwrap();
            return response;
        })
    })
}
