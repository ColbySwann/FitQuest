package swf.army.mil.fitquest.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository mockUserRepository;

    @InjectMocks
    UserService userService;

    @Test
    void getAllUsers_shouldCallRepository() {
        userService.getAllUsers();

        verify(mockUserRepository, times(1)).findAll();
    }

    @Test
    void getAllUsers_shoudReturnListOfUsers() {
        List<User> testListOfUsers = List.of(new User(1, "HelloWorld", "hello@gmmial.com", "mcnine", 0, 0, 500, 10, 10, 10, 0, LocalDateTime.now(), LocalDateTime.now()));
    }
}
