<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  async asyncData({ $axios, params }) {
    const data = await $axios.$get(
      `https://nuxt-on-steroids.firebaseio.com/posts/${params.postId}.json`
    );
    return { loadedPost: { ...data, id: params.postId } };
  },
  methods: {
    async onSubmitted(editedPost) {
      await this.$store.dispatch("editPost", editedPost);
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
