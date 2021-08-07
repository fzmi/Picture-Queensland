<?php
$pageTitle = "World War II";
include('header.php');
?>

<aside id="timeline" class="transition-slide-in"
        style="transform: rotate(-30deg);-moz-transform: rotate(-30deg);-webkit-transform: rotate(-30deg);">
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
        <div class="drag-4" onmousedown="mouseDown(event)" onmouseup="mouseUp(event, 'ww1.php')">
            <div class="timeline-button-4 timeline-button-inactive" title="World War I">1914</div>
        </div>
        <div class="drag-5">
            <div class="timeline-button-5 timeline-button-active" title="World War II">1939</div>
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
        <h3>World War II</h3>
        <p>During World War II, many Queenslanders volunteered for the Australian Imperial Force, the Royal Australian 
            Air Force and the Royal Australian Navy.<br>
            Following the outbreak of war with Japan, Queensland soon became a virtual frontline, as fears of invasion 
            grew. Several cities and places in Northern Queensland were bombed by the Japanese during their air attacks 
            on Australia. These included Horn Island, Townsville and Mossman.<br>
            There was a massive buildup of Australian and United States forces in the state, and the Allied Supreme 
            Commander in the South West Pacific Area, General Douglas MacArthur, established his headquarters in 
            Brisbane. Facilities were assigned or constructed to accommodate and train these forces such as Camp Cable 
            south of Brisbane. Tens of thousands of Queenslanders were conscripted into Militia (reserve) units.<br>
            On 14 May 1943 the Australian Hospital Ship Centaur was sunk off North Stradbroke Island, by a torpedo from 
            a Japanese Navy submarine. Later in the war, the 3rd Division, a Militia unit made of predominantly 
            Queensland personnel, took part in the Bougainville campaign.<br>
        </p>
    </article>
    <a href="event/ww2.php" id="description-enter">Enter</a>
</aside>

<?php include('footer.php'); ?>