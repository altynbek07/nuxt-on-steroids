<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
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
  methods: {
    async onSubmitted(postData) {
      await this.$axios.$post(
        "https://nuxt-on-steroids.firebaseio.com/posts.json",
        { ...postData, updatedDate: new Date() }
      );
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
