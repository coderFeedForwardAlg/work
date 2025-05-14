use axum::{                                                                                                                                                                      
    extract::{self, Extension, Path},                                                                                                                                            
    routing::{get, post},                                                                                                                                                        
    Json, Router,                                                                                                                                                                
};                                                                                                                                                                               
use serde::Deserialize;                                                                                                                                                          
use serde_json::{json, Value};                                                                                                                                                   
use sqlx::PgPool;                                                                                                                                                                
use sqlx::{postgres::PgPoolOptions, prelude::FromRow};                                                                                                                           
use std::env;                                                                                                                                                                    
use std::net::SocketAddr;
use std::result::Result;
use std::sync::Arc;
use axum::http::StatusCode;
use sqlx::types::chrono::Utc;
use tower_http::services::ServeDir;


#[derive(Debug, Deserialize, FromRow)]
struct Users {
    id: uuid::Uuid,
    username: String,
    email: String,
}


async fn add_users(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<Users>,
) -> Json<Value> {
    let query = "INSERT INTO users (id, username, email) VALUES ($1, $2, $3)";
    let result = sqlx::query(query)
    	.bind(payload.id)
	.bind(payload.username)
	.bind(payload.email)
        .execute(&pool)
        .await;
    match result {
        Ok(value) => Json(json!({"res": "added"})),
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_users(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM users";
    let q = sqlx::query_as::<_, Users>(query);

    let elemints: Vec<Users> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"id": elemint.id, 
	"username": elemint.username, 
	"email": elemint.email, 

        })
    
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}
#[derive(Debug, Deserialize, FromRow)]
struct WorkSessions {
    id: uuid::Uuid,
    user_id: uuid::Uuid,
    start_datetime: chrono::DateTime<Utc>,
    end_datetime: chrono::DateTime<Utc>,
}


async fn add_work_sessions(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<WorkSessions>,
) -> Json<Value> {
    let query = "INSERT INTO work_sessions (id, user_id, start_datetime, end_datetime) VALUES ($1, $2, $3, $4)";
    let result = sqlx::query(query)
    	.bind(payload.id)
	.bind(payload.user_id)
	.bind(payload.start_datetime)
	.bind(payload.end_datetime)
        .execute(&pool)
        .await;
    match result {
        Ok(value) => Json(json!({"res": "added"})),
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_work_sessions(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM work_sessions";
    let q = sqlx::query_as::<_, WorkSessions>(query);

    let elemints: Vec<WorkSessions> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"id": elemint.id, 
	"user_id": elemint.user_id, 
	"start_datetime": elemint.start_datetime, 
	"end_datetime": elemint.end_datetime, 

        })
    
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}
#[derive(Debug, Deserialize, FromRow)]
struct Tolearn {
    id: uuid::Uuid,
    user_id: uuid::Uuid,
    item: String,
    created_at: chrono::DateTime<Utc>,
}


async fn add_tolearn(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<Tolearn>,
) -> Json<Value> {
    let query = "INSERT INTO tolearn (id, user_id, item, created_at) VALUES ($1, $2, $3, $4)";
    let result = sqlx::query(query)
    	.bind(payload.id)
	.bind(payload.user_id)
	.bind(payload.item)
	.bind(payload.created_at)
        .execute(&pool)
        .await;
    match result {
        Ok(value) => Json(json!({"res": "added"})),
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_tolearn(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM tolearn";
    let q = sqlx::query_as::<_, Tolearn>(query);

    let elemints: Vec<Tolearn> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"id": elemint.id, 
	"user_id": elemint.user_id, 
	"item": elemint.item, 
	"created_at": elemint.created_at, 

        })
    
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}
#[derive(Debug, Deserialize, FromRow)]
struct Exercises {
    id: uuid::Uuid,
    user_id: uuid::Uuid,
    performed_at: chrono::DateTime<Utc>,
    did_dynamic_stretch: bool,
    pullups: i32,
    squats: i32,
    pushups: i32,
    chinups: i32,
}


async fn add_exercises(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<Exercises>,
) -> Json<Value> {
    let query = "INSERT INTO exercises (id, user_id, performed_at, did_dynamic_stretch, pullups, squats, pushups, chinups) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    let result = sqlx::query(query)
    	.bind(payload.id)
	.bind(payload.user_id)
	.bind(payload.performed_at)
	.bind(payload.did_dynamic_stretch)
	.bind(payload.pullups)
	.bind(payload.squats)
	.bind(payload.pushups)
	.bind(payload.chinups)
        .execute(&pool)
        .await;
    match result {
        Ok(value) => Json(json!({"res": "added"})),
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_exercises(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM exercises";
    let q = sqlx::query_as::<_, Exercises>(query);

    let elemints: Vec<Exercises> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"id": elemint.id, 
	"user_id": elemint.user_id, 
	"performed_at": elemint.performed_at, 
	"did_dynamic_stretch": elemint.did_dynamic_stretch, 
	"pullups": elemint.pullups, 
	"squats": elemint.squats, 
	"pushups": elemint.pushups, 
	"chinups": elemint.chinups, 

        })
    
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}



#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    let db_url = "postgres://dbuser:p@db:5432/work";
    
    // Add retry logic for database connection
    let mut retry_count = 0;
    let max_retries = 5;
    let mut pool = None;
    
    while retry_count < max_retries {
        match PgPoolOptions::new()
            .max_connections(100)
            .connect(db_url)
            .await {
                Ok(p) => {
                    pool = Some(p);
                    break;
                },
                Err(e) => {
                    println!("Failed to connect to database (attempt {}/{}): {}",
                             retry_count + 1, max_retries, e);
                    retry_count += 1;
                    if retry_count < max_retries {
                        println!("Retrying in 3 seconds...");
                        tokio::time::sleep(tokio::time::Duration::from_secs(3)).await;
                    }
                }
            }
    }
    
    let pool = match pool {
        Some(p) => p,
        None => return Err("Failed to connect to database after maximum retries".into())
    };
let static_dir = ServeDir::new("static");

    sqlx::migrate!("./migrations").run(&pool).await?;
    let app = Router::new()
    	.route("/add_users", post(add_users))
 .route("/get_users", get(get_users))
 .route("/add_work_sessions", post(add_work_sessions))
 .route("/get_work_sessions", get(get_work_sessions))
 .route("/add_tolearn", post(add_tolearn))
 .route("/get_tolearn", get(get_tolearn))
 .route("/add_exercises", post(add_exercises))
 .route("/get_exercises", get(get_exercises))
        .nest_service("/react", static_dir.clone())
        .with_state(pool);



    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();

    axum::serve(listener, app).await.unwrap();
    Ok(())
}


