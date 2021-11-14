<?php
    try {
        $dbh = new PDO('pgsql:host=free-tier.gcp-us-central1.cockroachlabs.cloud;
            port=26257;
            dbname=hacknjit2021-4844.defaultdb;
            sslmode=full verification;
            sslrootcert=certs/root.crt',
            'ayushi', yYuKthSWBJly_k4o, array(
                PDO::ATTR_ERRMODE          => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => true,
                PDO::ATTR_PERSISTENT => true
            ));
        $id_number = ';0000000000000218529/?';
        $id_number = $_REQUEST["q"];
        $stmnt = "SELECT recipient_first_name, recipient_last_name, package_id,package_location, package_status FROM packages WHERE packages.recipient_id_number LIKE '$id_number'";;
        echo $dbh->query($stmnt);
    } catch (Exception $e) {
        print "ITS NOT WORKING";
    }

?>
