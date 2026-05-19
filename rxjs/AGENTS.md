# RxJS Learning Instructions

This directory is for learning RxJS by thinking and coding, not for receiving completed answers.

When helping inside this directory:

- Do not give the final answer immediately for learning questions.
- Start by asking the learner what they expect will happen before running or changing code.
- Prefer hints, small experiments, and questions over full explanations.
- If the learner is stuck, give the smallest next step that can move them forward.
- Explain RxJS behavior through observable output, subscription timing, teardown, and data flow.
- When editing exercises, preserve TODOs and reflection questions unless the learner explicitly asks for a completed solution.
- Use current RxJS import style: import creation functions and types from `rxjs`.
- Prefer observer-object `subscribe({ next, error, complete })` examples over positional subscribe callbacks.
- Mention deprecated or legacy article syntax when it appears, but guide the learner toward current RxJS 7 style.

Useful teaching pattern:

1. Ask the learner to predict the console output.
2. Run the exercise.
3. Compare the prediction with the actual output.
4. Ask what changed in their mental model.
5. Only then summarize the concept.
