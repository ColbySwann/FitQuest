package swf.army.mil.fitquest.user;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import swf.army.mil.fitquest.exception.UserNotFoundException;
import swf.army.mil.fitquest.user.UserController;
import swf.army.mil.fitquest.user.UserService;

import java.util.ArrayList;

@WebMvcTest(UserController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    UserService mockUserService;
    User user1 = new User(1L, "User1", "user1@aol.com", "user_one");
    User user2 = new User(2L, "User2", "user2@aol.com", "user_two");
    ArrayList<User> users = new ArrayList<>();

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Test
    void shouldAcceptGetRequestForAllUsers() throws Exception{
        users.add(user1);
        users.add(user2);
        when(userService.findAllUsers()).thenReturn(users);
        mockMvc.perform(get("/api/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*").isArray());
    }

    @Test
    void shouldCallGetUsersFromUserServiceForGetRequest() throws Exception{
        mockMvc.perform(get("/api/users"));
        verify(mockUserService, times(1)).findAllUsers();
    }

    @Test
    void shouldCallGetUserByIDFromUserService() throws Exception{
        users.add(user1);
        users.add(user2);
        when(userService.findUserById(1L)).thenReturn(user1);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void shouldCreateUser() throws Exception{
        when(userService.saveUser(any(User.class))).thenReturn(user1);
        String userJson = objectMapper.writeValueAsString(user1);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.username").value("User1"));
        verify(userService).saveUser(any(User.class));
    }

    @Test
    void shouldDeleteUser() throws Exception{
        Long userId = 1L;
        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/users/{id}", userId))
                .andExpect(status().isNoContent());
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    void shouldUpdateUser() throws Exception{
        Long userId = 1L;

        User updatedUser = new User(userId, "UpdatedUser", "updatedUser@aol.com", "updated_user");
        when(userService.updateUser(eq(userId), any(User.class))).thenReturn(updatedUser);

        String userJson = objectMapper.writeValueAsString(updatedUser);

        mockMvc.perform(put("/api/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("UpdatedUser"));
        verify(userService, times(1)).updateUser(eq(userId), any(User.class));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonExistentUser() throws Exception{
        Long userId = 99L;
        User updatedUser = new User(userId, "Ghost");

        when(userService.updateUser(eq(userId), any(User.class)))
                .thenThrow(new UserNotFoundException("User not found with id " + userId));

        String userJson = objectMapper.writeValueAsString(updatedUser);

        mockMvc.perform(put("/api/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found with id " + userId));

        verify(userService).updateUser(eq(userId), any(User.class));
    }


}
