// Simple Rust program to check for cycles in a workflow graph.
// Save as validator.rs; requires `petgraph = "0.6"` in Cargo.toml to compile and run.
use petgraph::graph::{DiGraph, NodeIndex};
use petgraph::algo::is_cyclic_directed;
use serde::Deserialize;
use std::fs;

#[derive(Deserialize)]
struct Node { id: String }
#[derive(Deserialize)]
struct Edge { source: String, target: String }
#[derive(Deserialize)]
struct Graph { nodes: Vec<Node>, edges: Vec<Edge> }

fn main() {
    let data = fs::read_to_string("workflow.json").expect("workflow.json missing");
    let g: Graph = serde_json::from_str(&data).expect("invalid JSON");
    let mut map = std::collections::HashMap::new();
    let mut dg = DiGraph::<&str, ()>::new();
    for n in &g.nodes {
        let idx = dg.add_node(n.id.as_str());
        map.insert(n.id.clone(), idx);
    }
    for e in &g.edges {
        let s = map.get(&e.source).unwrap();
        let t = map.get(&e.target).unwrap();
        dg.add_edge(*s, *t, ());
    }
    println!("Has cycle: {}", is_cyclic_directed(&dg));
}
