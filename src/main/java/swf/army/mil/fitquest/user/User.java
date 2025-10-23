package swf.army.mil.fitquest.user;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import swf.army.mil.fitquest.characterCustomization.CharacterCustomization;
import swf.army.mil.fitquest.completedWorkout.CompletedWorkout;
import swf.army.mil.fitquest.quest.CompletedQuest;
import swf.army.mil.fitquest.reward.Reward;
import swf.army.mil.fitquest.weeklyChallenge.UserWeeklyChallenge;
import swf.army.mil.fitquest.workoutProgram.WorkoutProgram;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;


//    private int level = 1;
//    private int current_xp = 0;
//
//    private int xp_to_next_level = 500;
//    private int strength = 10;
//    private int endurance = 10;
//    private int agility = 10;
//    private int total_points = 0;
//    private LocalDateTime created_at = LocalDateTime.now();
//    private LocalDateTime updated_at = LocalDateTime.now();
//
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private CharacterCustomization characterCustomization;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<WorkoutProgram> workoutPrograms;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<CompletedWorkout> completedWorkouts;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<CompletedQuest> completedQuests;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Reward> rewards;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<UserWeeklyChallenge> weeklyChallengeProgress;
//
//
//    public User(long l, String user1) {
//        this.id = l;
//        this. username = user1;
//    }
}
