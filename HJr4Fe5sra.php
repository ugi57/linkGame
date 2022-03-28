<?php
session_start();
if (! isset($_SESSION['views'])){
    $_SESSION['views'] = 0;
}
error_reporting(0);
if (isset($_POST['time'])) {
    $now = (int)time()*1000;
    for ($i = -2;$i < 3; $i++){
        if ($now + $i*1000 == (int)$_POST['time']){
            echo ("happy{Java_Script_0v0}");
            session_destroy();
            exit();
        }
        if ($i == 2){
            echo ("<p>Wrong time. Maybe you should think more?</p>");
            $_SESSION['views'] += 1;
        }
    }
}
else {
    echo ("Post me you time!");
}
if (isset($_SESSION['views'])) {
    if ($_SESSION['views'] >= 2){
        echo ("<p>An error of 5 seconds is allowed</p>");
    }
    if ($_SESSION['views'] >= 3){
        echo ("<p>The timestamp of JavaScript is accurate to milliseconds, but the one of PHP is only accurate to seconds</p>");
    }
    if ($_SESSION['views'] >= 4){
        echo ("<p>So I just fill change the last 3 digits of JavaScript's timestamp to '000' and add '000' behind PHP's timestamp</p>");
    }
    if ($_SESSION['views'] >= 5){
        echo ("<p>Maybe you should Baidu or Google</p>");
    }
    if ($_SESSION['views'] >= 6){
        echo ("<p>well well well</p><p>My JavaScript timestamp: Date.parse(new Date())</p><p>My PHP timestamp: (int)time()*1000</p>");
    }
}
exit();