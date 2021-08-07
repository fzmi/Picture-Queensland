<?php
$activePage = basename($_SERVER['SCRIPT_FILENAME'], '.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- php different -->
    <title>Picture Queensland - <?php echo $pageTitle; ?></title>
    <link rel="icon" href="images/icons/website-icon.png">
    <link href="css/style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Play|Poiret+One&display=swap" rel="stylesheet">
</head>
<!-- php different -->
<body id="main-<?php echo $activePage; ?>" class="main">
    <nav id="welcome-page">
        <article>
            <h1>Picture Queensland</h1>
            <p>Around 40,000 out of copyright photographs from the photograph collection of the State Library of 
                Queensland. People and places from across Queensland across time. The dataset includes descriptions 
                of the photographs, geotags and links to the digital photographs in three sizes.</p>
        </article>
        <button id="welcome-page-start"><span>Let's get started</span></button>
    </nav>

    <section id="welcome-back">
        <p><strong>Welcome back,</strong> anonymous time traveller!</p>
    </section>

    <a class="menu-open" href="javascript:void(0)">
        <img src="images/icons/menu-icon.png" alt="Menu" id="menu-icon" class="transition-slide-in">
    </a>

    <nav id="side-menu" class="menu">
        <section id="side-menu-button">
                <a href="javascript:void(0)" class="close-button menu-close">&times;</a>
        </section>
        <section id="side-menu-content">
            <section id="side-menu-profile">
                <h3>Greetings,<br>Time traveller.</h3>
                <section id="side-menu-profile-user">
                    <img src="images/icons/user.png" alt="User profile" width=200>
                    <section>
                        <p id="side-menu-profile-user-name">Anonymous user</p>
                        <p id="side-menu-profile-user-count">0 pictures unlocked</p>
                    </section>
                </section>
            </section>
            <section id="side-menu-trophy">
                <h4>Trophies</h4>
                <section id="side-menu-trophy-items">
                    <section>
                        <div id="side-menu-trophy-gold-rush" title="Gold Rush Trophy"><img src="images/trophies/trophy-gold-rush-locked.png"></div>
                        <div id="side-menu-trophy-ww1" title="World War I Trophy"><img src="images/trophies/trophy-ww1-locked.png"></div>
                    </section>
                    <section>
                        <div id="side-menu-trophy-ww2" title="World War II Trophy"><img src="images/trophies/trophy-ww2-locked.png"></div>
                        <div id="side-menu-trophy-all" title="Team DE & Co. Trophy"><img src="images/trophies/trophy-all-locked.png" alt="Final Trophy"></div>
                    </section>
                    
                </section>
            </section>
            <section id="side-menu-setting">
                <h4>Settings</h4>
                <section id="side-menu-setting-items">
                    <a href="javascript:void(0)" onclick="changeName()">Change my name</a>
                    <a href="javascript:void(0)" id="menu-clear" class="menu-close">Reset all progress</a>
                    <a href="legal.html" target="_blank">References</a>
                </section>
                
            </section>
        </section>
        <section id="side-menu-legal">
            <p><a href="https://www.nifu.me" target="_blank">&copy; 2019 Nifu no Koya, Team DE & Co.</a></p>
        </section>
    </nav>

    <!-- <a id="help-icon" class="transition-slide-in">?</a> -->
