package swf.army.mil.fitquest.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import swf.army.mil.fitquest.exception.UserNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;



    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User findUserById(Long id){
        return userRepository.findById(id).get();
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsernameAndDeletedFalse(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    public void softDeleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(true);
        userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(updatedUser.getPassword());
        }

        return userRepository.save(user);
    }

    public Map<String, Object> loginUser(Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByUsernameAndDeletedFalse(username);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(password)){
            throw new RuntimeException("Invalid Password");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());


        return response;
    }


}
