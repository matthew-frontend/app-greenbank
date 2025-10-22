<template>
  <section class="container py-16">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-3xl font-semibold mb-4">Contact</h2>
          <p data-aos="fade-up">This page demonstrates SSR + i18n routing. Switch EN/FR in the header.</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Name" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Email" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea label="Message" outlined rows="5"></v-textarea>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn color="primary" large>Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
