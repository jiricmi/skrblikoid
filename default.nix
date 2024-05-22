{ nixpkgs ? import <nixpkgs> {  } }:

let
  pkgs = [
    nixpkgs.yarn
  ];

in
  nixpkgs.stdenv.mkDerivation {
    name = "env";
    buildInputs = pkgs;
  }