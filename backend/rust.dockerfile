
# Build stage
FROM rust:latest as builder

WORKDIR /app

COPY . .

RUN cargo build --release

#Preduction stage
FROM debian:bookworm-slim

WORKDIR /usr/local/bin

COPY --from=builder /app/target/release/work /usr/local/bin/backend

CMD [ "./backend" ]