<?php
$activePage = basename($_SERVER['SCRIPT_FILENAME'], '.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Event - <?php echo $pageTitle; ?></title>
    <link rel="icon" href="../images/icons/website-icon.png">
    <link href="../css/leaflet.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Play&display=swap" rel="stylesheet">
    <script>
        const RESOURCE_ID = "8a327cf9-cff9-4b34-a461-6f883bdc3a48";
        const DATASET_URL = "https://www.data.qld.gov.au/api/3/action/datastore_search";
    </script>
</head>
<body id="event-<?php echo $activePage; ?>" class="event">
    <section class="loading-screen"></section>
