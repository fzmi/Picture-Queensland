<?php
$pageTitle = "World War I";
include('header.php');
?>

<nav class="event-nav">
    <a id="event-nav-back" title="Back to map view"><img src="../images/icons/back-icon.png" alt="Back"></a>
    <header>
        <h2>World War I</h2>
        <p>1914 - 1918</p>
    </header>
    
    <button id="event-nav-story" title="Collect 3 stories to unlock the trophy" onclick="toggleStoryPanel()">
        <section id="progress-bar">
            <p>Story (0/3)</p>
            <div class="progress-bar-container">      
                <div class="progress-bar-background">
                    <div class="progress-bar-color"></div>
                </div>
            </div>
        </section>
    </button>

    <button id="event-nav-trophy">
        <img src="../images/trophies/trophy-locked.png" alt="Trophy">
    </button>
    
    <!-- php different -->
    <a href="../ww1.php" id="event-nav-close" title="Exit event"><img src="../images/icons/delete-icon.png" alt="Close"></a>
</nav>

<section id="story">
    <h3>Stories</h3>
    <p>You currently have no stories. Go explore the images to collect them! <br>
    <a href="../images/stories/ww1-hint.png" target="_blank"><u>(Hi visitors! Here is the hint of 3 map pins which contain the stories.<br>
        During the game, you can directly click on the black "Give up" button to speed up the marking process.)</u></a></p>
    <section id="story-list"></section>
</section>

<?php include('footer.php'); ?>
