<template>
    <v-container>
      <v-layout style="margin: 150px 70px">
        <v-flex>
          <UserList></UserList>
        </v-flex>
      </v-layout>
    </v-container>
</template>
​
​
<script>
import FirebaseService from '@/services/FirebaseService';
import UserList from '@/components/admin/UserList';

export default {
  name: "UserAdminPage",
  components: {
    UserList
  }
}
</script>