package swf.army.mil.fitquest.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swf.army.mil.fitquest.exception.UserNotFoundException;

import java.util.List;

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

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setUsername(user.getUsername());
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

}
