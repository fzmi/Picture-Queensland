<?php
$pageTitle = "World War I";
include('header.php');
?>

<aside id="timeline" class="transition-slide-in">
    <div class="timeline-button">
        <div class="drag-1">
            <div class="timeline-button-1 timeline-button-inactive" title="European Exploration">1800</div>
        </div>
        <div class="drag-2">
            <div class="timeline-button-2 timeline-button-inactive" title="Frontier War">1835</div>
        </div>
        <div class="drag-3" onmousedown="mouseDown(event)" onmouseup="mouseUp(event, 'gold-rush.php')">
            <div class="timeline-button-3 timeline-button-inactive" title="Gold Rush">1858</div>
        </div>
        <div class="drag-4">
            <div class="timeline-button-4 timeline-button-active" title="World War I">1914</div>
        </div>
        <div class="drag-5" onmousedown="mouseDown(event)" onmouseup="mouseUp(event, 'ww2.php')">
            <div class="timeline-button-5 timeline-button-inactive" title="World War II">1939</div>
        </div>
        <div class="drag-6">
            <div class="timeline-button-6 timeline-button-inactive" title="Post War">1965</div>
        </div>
        <div class="drag-7">
            <div class="timeline-button-7 timeline-button-inactive" title="Modern World">1980</div>
        </div>
    </div>
</aside>

<aside id="description" class="transition-slide-in">
    <article>
        <h3>World War I</h3>
        <p>The United Kingdom declared war against Germany on 4 August 1914. As Australia's new constitution was 
            silent on the declaration of war, on 20 August 1914 Queensland made an independent proclamation of war 
            between His Majesty the King (George V) and the German Emperor (Wilhelm II). Later Queensland made 
            further independent proclamations of war against Austria and Hungary, Bulgaria and Turkey. Initially 
            in 1914 the war in Europe did not impact greatly on life in Queensland, although the existing militia 
            were deployed in the Australian Naval and Military Expeditionary Force attack on German New Guinea.</p>
    </article>
    <a href="event/ww1.php" id="description-enter">Enter</a>
</aside>

<?php include('footer.php'); ?>