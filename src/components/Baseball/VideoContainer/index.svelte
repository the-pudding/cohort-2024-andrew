<script>
    import { onDestroy, onMount } from "svelte";
    import { base } from "$app/paths";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import { videoSound } from '../stores.js'

    export let url;
    export let videoId;
    export let startSecond;
    export let endSecond;

    let value;

    let videoContainer;
    let video;
    let mounted;
    let observer;

    let videoEl;

    let options = {
        root: video,
        rootMargin: "0px",
        threshold: 1.0,
    };

    let muteOption=true;

    const unsubscribe = videoSound.subscribe((value)=>(muteOption=value));
    onDestroy(unsubscribe);

    $: value == 0 ? playVideo() : '';

    function playVideo(){
        if(mounted && videoEl) {
            console.log(videoEl)
        }
        videoEl.play();
    }

    onMount(()=>{
        mounted = true;
        // video=videoContainer.querySelectorAll(`#${videoId}`)
        observer = new IntersectionObserver(playVideo, options);
    })

</script>


<Scrolly bind:value={value}>

<div bind:this={videoContainer} class="video-container">
    <video muted={muteOption} bind:this={videoEl} id={videoId}>
        <source src="{`${base}/assets/${url}`}" type="video/mp4">
        <track kind ="captions">
        Your browser does not support the video tag.
    </video>
</div>
</Scrolly>

<style>
    video {
        display: block;
		margin-left:auto;
		margin-right:auto;
        width: 100vw;
    }
    .video-container{
        display: block;
        width: 100vw;
        margin-top: 5vh;
        margin-bottom: 5vh;
    }
</style>