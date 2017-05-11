<?php
$_fp = fopen("php://stdin", "r");

//Take an input and for 1 <= n <= k find all numbers where the sum of each digit squared in a number is a perfect square   
$input = fgets($_fp);
echo sum_of_squares($input);

//Functions
function sum_of_squares($k)
$total = 0;
for($i = 1; $i <= $k; $i++) {
    $array = to_array($i);
    $sum = sum_of_squares_array($array);
    if (is_square($sum)) {
        $total += $i;
    }
    return $total;
}

function to_array($string) {
    $array = array();
    for($i = 0; $i < strlen($string); $i++) {
        $array[] = substr($string, $i, 1);
    }
    return $array;
}

function square($num) {
    return ($num * $num);
}

//Take an array of digits and get the sum of all their squares
function sum_of_squares_array($array) {
    $sum = 0;
    foreach($array as $num) {
        $sum += square(intval($num));
    }
    return $sum;
}

function is_square($num) {
    for($i = 1; $i <= $num; $i++) {
        if (($num / $i) === $i){
            return true;
        }
        //If $i squared is greater than $num it's not a square
        else if ($num < square($i)) {
            return false;
        }
    }
}

?>
