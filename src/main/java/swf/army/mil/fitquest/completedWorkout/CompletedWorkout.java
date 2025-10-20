package swf.army.mil.fitquest.completedWorkout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.CompletedExercise.CompletedExercise;
import swf.army.mil.fitquest.user.User;
import swf.army.mil.fitquest.workoutProgram.WorkoutProgram;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "completed_workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private WorkoutProgram program;

    private LocalDateTime completedAt = LocalDateTime.now();
    private int xpEarned = 0;
    private int pointsEarned = 0;

    @OneToMany(mappedBy = "completedWorkout", cascade = CascadeType.ALL)
    private List<CompletedExercise> completedExercises;


}
