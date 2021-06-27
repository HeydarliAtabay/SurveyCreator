# Exam #1: "Survey"

## Student: s277000 HEYDARLI ATABAY

## React Client Application Routes

- Route `/`: redirects to the "/surveys" route
- Route `/login`: Login page where administrators can authenticate itself
- Route `/surveys`: List of all published surveys(for non authenticated user); list of all surveys of the user(for authenticated user)
- Route `/questions`: List of questions of previously selected survey
- Route `/answers`: List of answers for the selected survey

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains id(PK); email; name; hash
- Table `surveys` - contains id(PK); title; numRespond(number of responders); published; user
- Table `submissions` - contains id(PK); responder(Name of the Responder); survey_id(FK)
- Table `questions` - contains id(PK); question(text of the question); questiontype; num; min; max; one; two; three; four; five; six; seven; eight; nine; ten; order; survey_id(FK)
- Table `answers` - contains id(PK); submission_id(FK); survey_id(FK); question_id(FK); answer(answer to the open question); one; two; three; four; five; six; seven; eight; nine; ten; status(status of the submission)

(PK)= Primary Key; (FK)=Foreign Key

## Main React Components

- `Header` (in `Header.js`): Navigation bar where the name of app is shown and with links to the various routes(main page& log in Log out)
- `LoginComponent` (in `LoginComponent.js`): Realizes the authentication of users, by checking inserted credentials and showing errors if there is any
- `SurveyList` (in `SurveyList.js`): Using for creating a list of surveys
- `SurveyItem` (in `SurveyList.js`): Creating the survey element for the list of surveys, where admin can open that survey, check responses or delete it. Non authenticated user can only enter to the survey from this component.
- `QuestionList` (in `QuestionList.js`): Creates a list of questions, and buttons from where user can submit the answers(before the checks for specifications will be done here)
- `QuestionItem` (in `QuestionList.js`): Creating question element where non authenticated user can respond questions and authenticated administrator can delete or modify the order og questions
- `AnswerList` (in `AnswerList.js`): Creates a list of answers, and navigation buttons for moving between different answers of selected survey
- `AnswerItem` (in `AnswerList.js`): Answer element, where the already given answers are representing
- `ModalFormTitle` (in `ModalFormTitle.js`): Modal form for adding new survey
- `ModalFormQuestion` (in `ModalFormQuestion.js`): Modal form for adding a new question with selecting all specifications, question type and possible answers of the question

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

| Email address    | Password  |
| :--------------- | :-------: |
| atabay@polito.it | atabay111 |
| admin@survey.it  | admin111  |
