#!/bin/bash

function add
{
  echo $(($1 + $2));
}

function reduce
{
  echo $(($1 - $2));
}

function multiple
{
  echo $(($1 * $2));
}

function divide
{
  echo $(($1 / $2));
}
