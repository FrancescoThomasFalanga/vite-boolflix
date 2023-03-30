<script>
export default {
    data() {
        return {

        }
    },
}
</script>


<template>
    <div class="video">
        <video src="/img/mio-video.mp4" autoplay muted></video>
    </div>
</template>


<style lang="scss" scoped>
    
    .video {
        margin-top: 80px;
        
        video {
            width: 100%;
            height: 90vh;
            object-fit: cover;
        }
    }


</style>