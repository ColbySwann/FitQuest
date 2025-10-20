package swf.army.mil.fitquest.programExercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swf.army.mil.fitquest.exercise.Exercise;
import swf.army.mil.fitquest.workoutProgram.WorkoutProgram;

import java.beans.IntrospectionException;

@Entity
@Table(name = "program_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgramExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private WorkoutProgram program;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    private int orderIndex = 0;
    private int sets = 0;
    private int reps = 0;
    private int duration = 10;



}
