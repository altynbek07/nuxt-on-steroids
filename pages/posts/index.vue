<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  asyncData() {
    return {
      loadedPosts: [
        {
          id: 1,
          title: "Title",
          previewText: "Text",
          thumbnail:
            "https://techclad.com/wp-content/uploads/2019/02/2018-07-10-image-35.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
