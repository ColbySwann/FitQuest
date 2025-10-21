package swf.army.mil.fitquest.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import swf.army.mil.fitquest.exception.UserNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository mockUserRepository;

    @InjectMocks
    UserService userService;
    User user1 = new User(1L, "User1");

    @BeforeEach
    void setUp() {List<User> testListOfUsers = List.of(new User(1L, "User1"), new User(2L, "User2"), new User(3L, "User3"));}

    @Test
    void getAllUsers_shouldCallRepository() {
        userService.findAllUsers();

        verify(mockUserRepository, times(1)).findAll();
    }

    @Test
    void getAllUsers_shoudReturnListOfUsers() {
        List<User> testListOfUsers = List.of(new User(1L, "User1"), new User(2L, "User2"), new User(3L, "User3"));
        when(mockUserRepository.findAll()).thenReturn(testListOfUsers);

        List<User> res = userService.findAllUsers();

        assertEquals(res, testListOfUsers);
    }

    @Test
    void getUserByID_shouldReturnOneUser() {
        List<User> testListOfUsers = List.of(new User(1L, "User1"), new User(2L, "User2"), new User(3L, "User3"));
        when(mockUserRepository.findById(1L)).thenReturn(Optional.of(user1));
        User foundUser = userService.findUserById(1L);
        assertThat(foundUser).isEqualTo(user1);
    }

    @Test
    void deleteUserByID_shouldReturnNoContent() {
        Long userId = 1L;
        when(mockUserRepository.existsById(userId)).thenReturn(true);
        userService.deleteUser(userId);
        verify(mockUserRepository, times(1)).deleteById(userId);
    }

    @Test
    void shouldUpdateUserThatExists() {
        Long userId = 1L;
        User existingUser = new User(userId, "OldName");
        User updatedUser = new User(userId, "NewName");

        when(mockUserRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(mockUserRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.updateUser(userId, updatedUser);

        assertEquals("NewName", result.getUsername());

        verify(mockUserRepository).save(existingUser);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound(){
        Long userId = 99L;
        User updatedUser = new User(userId, "Ghost");

        when(mockUserRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.updateUser(userId, updatedUser));

        verify(mockUserRepository, never()).save(any(User.class));
    }
}
