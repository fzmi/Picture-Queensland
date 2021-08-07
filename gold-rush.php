<?php
$pageTitle = "Gold Rush";
include('header.php');
?>

<aside id="timeline" class="transition-slide-in" 
        style="transform: rotate(30deg);-moz-transform: rotate(30deg);-webkit-transform: rotate(30deg);">
    <div class="timeline-button">
        <div class="drag-1">
            <div class="timeline-button-1 timeline-button-inactive" title="European Exploration">1800</div>
        </div>
        <div class="drag-2">
            <div class="timeline-button-2 timeline-button-inactive" title="Frontier War">1835</div>
        </div>
        <div class="drag-3">
            <div class="timeline-button-3 timeline-button-active" title="Gold Rush">1858</div>
        </div>
        <div class="drag-4" onmousedown="mouseDown(event)" onmouseup="mouseUp(event, 'ww1.php')">
            <div class="timeline-button-4 timeline-button-inactive" title="World War I">1914</div>
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
        <h3>Gold Rush</h3>
        <p>Although smaller than the gold rushes of Victoria and New South Wales, Queensland had its own series of gold 
            rushes in the later half of the nineteenth century. In 1858, gold was discovered at Canoona. In 1867, gold 
            was discovered in Gympie. Richard Daintree's explorations in North Queensland led to several goldfields 
            being developed in the late 1860s. In 1872, William Hann discovered gold on the Palmer River, southwest of 
            Cooktown. Chinese settlers began to arrive in the goldfields, by 1877 there were 17,000 Chinese on 
            Queensland gold fields. In that year, restrictions on Chinese immigration were passed.</p>
    </article>
    <a href="event/gold-rush.php" id="description-enter">Enter</a>
</aside>

<?php include('footer.php'); ?>