package swf.army.mil.fitquest.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
        user.setAgility(updatedUser.getAgility());
        user.setCurrent_xp(updatedUser.getCurrent_xp());
        user.setEndurance(updatedUser.getEndurance());
        user.setLevel(updatedUser.getLevel());
        user.setXp_to_next_level(getExperienceForLevel(updatedUser.getLevel()));
        user.setTotal_points(updatedUser.getTotal_points());

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

    @Transactional
    public User addExperience(Long userId, int xpToAdd) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int newXp = user.getCurrent_xp() + xpToAdd;
        int requiredXp = getExperienceForLevel(user.getLevel());

        while (newXp >= requiredXp) {
            newXp -= requiredXp;
            user.setLevel(user.getLevel() + 1);
            requiredXp = getExperienceForLevel(user.getLevel());
        }
        user.setCurrent_xp(newXp);
        user.setXp_to_next_level(requiredXp);

        return userRepository.save(user);
    }

    public int getExperienceForLevel(int level) {
        double points = 0;
        int output = 0;

        for (int lvl = 1; lvl <= level; lvl++) {
            points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
            if (lvl == level) {
                return (int) Math.floor(points/4);
            }
            output = (int) Math.floor(points / 4);
        }

        return output;
    }


}
