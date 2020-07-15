<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="Qwerty"
      previewText="Text"
      thumbnail="https://techclad.com/wp-content/uploads/2019/02/2018-07-10-image-35.jpg"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      title="Qwerty"
      previewText="Text"
      thumbnail="https://techclad.com/wp-content/uploads/2019/02/2018-07-10-image-35.jpg"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
