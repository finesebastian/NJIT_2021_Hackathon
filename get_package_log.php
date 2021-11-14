<?php
    $db_return_value="";
//    $dbh = new PDO('pgsql:host=localhost;
//    port=26257;
//    dbname=hacknjit2021-4844.defaultdb;
//    sslmode=full_verification;
//    sslrootcert=/certs/ca.crt;',
//    'ayushi', 'yYuKthSWBJly_k4o', array(
//        PDO::ATTR_ERRMODE          => PDO::ERRMODE_EXCEPTION,
//        PDO::ATTR_EMULATE_PREPARES => true,
//        PDO::ATTR_PERSISTENT => true
//    ));

    $id_number = $_COOKIE["q"];
    $servername ="free-tier.gcp-us-central1.cockroachlabs.cloud";
    $username ="ayushi";
    $password = "yYuKthSWBJly_k4o";
    $dbname = "hacknjit2021-4844.defaultdb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $db_return_value = $dbh->query("SELECT * from packages WHERE packages.recipient_id_number LIKE'$id_number'");
    while($row = $result->fetch_assoc()) {
        foreach ($row as $k=>$v)
        {
            $db_return_value+= "$k : $v";
            $db_return_value += "<br />";
        }
    }
    echo $id_number;

?>
