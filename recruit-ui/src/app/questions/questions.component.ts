import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortHeaderIntl, MatTableDataSource }     from "@angular/material";
import { CandidateQuestion }                                  from "../shared/questions/candidateQuestions.modal";
import { QuestionService }                                    from "../shared/services/question.service";
// import { Question }                                       from "../shared/questions/question.modal";
import { Router }                                             from "@angular/router";

@Component ({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: [ './questions.component.scss' ]
})
export class QuestionsComponent implements OnInit , AfterViewInit {
  @ViewChild (MatSort) sort: MatSort;
  @Input () candidateQuestions: CandidateQuestion[];

  dataSource: MatTableDataSource<CandidateQuestion>;
  displayedColumns: string[] = [ 'question-edit', 'questionText', 'answer', 'difficulty', 'category' ];

  constructor (private questionService: QuestionService, private router: Router) {
  }

  ngOnInit () {
    if (this.candidateQuestions != null) {
      this.dataSource = new MatTableDataSource<CandidateQuestion> (this.candidateQuestions);
      this.displayedColumns.push ('candidateAnswer');
    } else {
      this.questionService.getQuestions ()
        .subscribe (questions => {
          let newDS: CandidateQuestion[] = [];
          for (let q of questions) {
            newDS.push (new CandidateQuestion ("", "", q));
          }
          this.dataSource = new MatTableDataSource<CandidateQuestion> (newDS);
        });
    }
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit () {
    this.dataSource.sort = this.sort;
  }

  onEdit (id: string) {
    if (this.candidateQuestions != null) {
      this.router.navigate ([ "questions", "with-answer", id ], { relativeTo: null });
    } else {
      this.router.navigate ([ "questions", id ], { relativeTo: null });
    }
  }

}