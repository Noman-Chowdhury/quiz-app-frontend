<template>
  <section class="test">

    <!--questionBox-->
    <div class="questionBox" id="app">

      <!-- transition -->
      <transition :duration="{ enter: 500, leave: 300 }" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">

        <!--qusetionContainer-->
        <div class="questionContainer" v-if="questionIndex<questions.length" v-bind:key="questionIndex">

          <header>
            <h1 class="title is-6">VueQuiz</h1>
            <!--progress-->
            <div class="progressContainer">
              <progress class="progress is-info is-small" :value="(questionIndex/questions.length)*100" max="100">{{(questionIndex/questions.length)*100}}%</progress>
              <p>{{ Math.round((questionIndex/questions.length)*100)}}% complete</p>
            </div>
            <!--/progress-->
          </header>

          <!-- questionTitle -->
          <h2 class="titleContainer title">{{ questions[questionIndex].question }}</h2>

          <!-- quizOptions -->
          <div class="optionContainer">
            <div class="option" v-for="(response, index) in questions[questionIndex].answers" @click="selectOption(response.id, questions[questionIndex].id)" :class="{ 'is-selected': userResponses[questionIndex] === response.id}" :key="index">
              {{ index | charIndex }}. {{ response.option }}
            </div>
          </div>

          <!--quizFooter: navigation and progress-->
          <footer class="questionFooter">

            <!--pagination-->
            <nav class="pagination" role="navigation" aria-label="pagination">

<!--              &lt;!&ndash; back button &ndash;&gt;-->
<!--              <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">-->
<!--                Back-->
<!--              </a>-->

              <!-- next button -->
              <a v-if="userResponses[questionIndex]!==null" class="button" :class="(userResponses[questionIndex]==null)?'':'is-active'" v-on:click="next();" :disabled="questionIndex>=questions.length">
                {{ 'Next' }}
              </a>

            </nav>
            <!--/pagination-->

          </footer>
          <!--/quizFooter-->

        </div>
        <!--/questionContainer-->

<!--        &lt;!&ndash;quizCompletedResult&ndash;&gt;-->
<!--        <div v-if="questionIndex >= questions.length" v-bind:key="questionIndex" class="quizCompleted has-text-centered">-->

<!--          &lt;!&ndash; quizCompletedIcon: Achievement Icon &ndash;&gt;-->
<!--          <span class="icon">-->
<!--                <i class="fa" :class="score()>3?'fa-check-circle-o is-active':'fa-times-circle'"></i>-->
<!--              </span>-->

<!--          &lt;!&ndash;resultTitleBlock&ndash;&gt;-->
<!--          <h2 class="title">-->
<!--            You did {{ (score() > 7 ? 'an amazing' : (score() >= 4 ? 'a good' : 'a poor')) }} job!-->
<!--          </h2>-->
<!--          <p class="subtitle">-->
<!--            Total score: {{ score() }} / {{ questions.length }}-->
<!--          </p>-->
<!--          <br>-->
<!--          <a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>-->
<!--          &lt;!&ndash;/resultTitleBlock&ndash;&gt;-->

<!--        </div>-->
<!--        &lt;!&ndash;/quizCompetedResult&ndash;&gt;-->

      </transition>

    </div>
    <!--/questionBox-->

  </section>
</template>

<script>
import Vue from "vue";

export default {
  name: "Quiz",
  data(){
    return {
      questionIndex: 0,
      userResponses: [],
      isActive: false,
      questions : [],
      question_id : null,
      test_response :[]
    }
  },
  created() {
    this.getQuestions()
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },
  methods: {
    restart: function(){
      this.questionIndex=0;
      this.userResponses=Array(this.questions.length).fill(null);
    },
    selectOption: function(answer, question) {

      Vue.set(this.userResponses, this.questionIndex, answer);
      this.test_response.push({question_id : question, answer_id : answer})
      //console.log(this.userResponses);
    },
    next: function() {
      if (this.questionIndex < this.questions.length)
        this.questionIndex++;
    },

    prev: function() {
      if (this.questions.length > 0) this.questionIndex--;
    },
    // Return "true" count in userResponses
    // score: function() {
    //   var score = 0;
    //   for (let i = 0; i < this.userResponses.length; i++) {
    //     if (
    //         typeof this.questions[i].responses[
    //             this.userResponses[i]
    //             ] !== "undefined" &&
    //         this.questions[i].responses[this.userResponses[i]].correct
    //     ) {
    //       score = score + 1;
    //     }
    //   }
    //   return score;
    //
    //   //return this.userResponses.filter(function(val) { return val }).length;
    // },
    getQuestions(){
      this.$store.dispatch('getQuestionFromDB')
          .then(()=>{
            this.questions = this.$store.getters.Questions
            this.userResponses = Array(this.questions.length).fill(null)
          })
    }

  }
}
</script>

<style scoped lang="scss">
$trans_duration: 0.3s;
$primary_color: #3D5AFE;

body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;

  height: 100vh;

  background: #CFD8DC;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  user-drag: none; /* disbale element dragging */

  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}
.animated {
  transition-duration: $trans_duration/2;
}

.container{
  margin: 0 0.5rem;
}

.questionBox {

  max-width: 30rem;
  width: 30rem;
  min-height: 30rem;

  background: #FAFAFA;
  position: relative;
  display: flex;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

  header{
    background:rgba(0,0,0,0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    h1{
      font-weight: bold;
      margin-bottom: 1rem !important;
    }
    .progressContainer {
      width: 60%;
      margin: 0 auto;
      >progress{
        margin:0;
        border-radius: 5rem;
        overflow: hidden;
        border:none;

        color:$primary_color;
        &::-moz-progress-bar { background: $primary_color; }
        &::-webkit-progress-value { background: $primary_color; }
      }
      >p{
        margin:0;
        margin-top: 0.5rem;
      }
    }
  }
  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;

  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align:center;

    > .icon{
      color: #FF5252;
      font-size: 5rem;

      .is-active{
        color: #00E676;
      }
    }
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0,0,0,0.85);
        border: transparent 1px solid;

        &.is-selected {
          border-color: rgba(black,0.25);
          background-color: white;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      background:rgba(0,0,0,0.025);
      border-top: 1px solid rgba(0,0,0,0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
    }
  }
}
.pagination{
  display: flex;
  justify-content: space-between;
}
.button{
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;

  transition:0.3s;

  &:hover{
    cursor: pointer;
    background: #ECEFF1;
    border-color:rgba(0,0,0,0.25);
  }
  &.is-active{
    background: $primary_color;
    color: white;
    border-color: transparent;

    &:hover{
      background: darken($primary_color,10%);

    }
  }
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}

</style>
