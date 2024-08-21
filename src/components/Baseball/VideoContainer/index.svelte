<script>
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    export let url;
    export let videoId;
    export let startSecond;
    export let endSecond;

    let videoContainer;
    let video;
    let observer;

    let options = {
        root: video,
        rootMargin: "0px",
        threshold: 1.0,
    };

    function playVideo(){
        console.log("video!");
        console.log(video);
        video.play();
    }

    onMount(()=>{
        video=videoContainer.querySelectorAll(`#${videoId}`)
        observer = new IntersectionObserver(playVideo, options);
    })

</script>

<div bind:this={videoContainer} class="video-container">
    <video id={videoId}>
        <source src="{`${base}/assets/${url}`}" type="video/mp4">
        <track kind ="captions">
        Your browser does not support the video tag.
    </video>
</div>

<style>
    video{
        display: block;
		margin-left:auto;
		margin-right:auto;
        max-width:100%;
    }
    .video-container{
        display: block;
		margin-left:auto;
		margin-right:auto;
        max-width:900px;
    }
</style>