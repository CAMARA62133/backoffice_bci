import {AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DataTableDirective} from '../../../directives/data-table/data-table.directive';
import {BciWorkflow} from '../../../interfaces/workflow.interface';
import {workflowCanvasSVG} from '../../../models/workflow';
import {SvgDrawingService} from '../../../services/svg-drawing/svg-drawing.service';
import {SvgElement} from '../../../models/svg-model';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-demandes',
  imports: [
    DataTableDirective,
    RouterLink,
  ],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css',
})
export class DemandesComponent implements OnInit {
  demandes = [
    {
      id: 1,
      title: 'Demandes 1',
      description: 'Demandes 1',
    },
    {
      id: 2,
      title: 'Demandes 2',
      description: 'Demandes 2',
    },
    {
      id: 3,
      title: 'Demandes 3',
      description: 'Demandes 3',
    },
    {
      id: 4,
      title: 'Demandes 4',
      description: 'Demandes 4',
    }
  ]

  workflows!: BciWorkflow[];
  savedWorkflows!: any;
  selectedWorkflow!: BciWorkflow;
  selectedWorkflowId!: string;

  workflowCanvasData!: any;
  selectedWorkflowCanvas!: string;

  svgContent = '';

  constructor(private svg: SvgDrawingService, private router: Router) {
  }

  //
  ngOnInit() {
    this.loadWorkflowsFromStorage();
    this.workflowCanvasData = workflowCanvasSVG;


    const elements: SvgElement[] = [
      {
        type: 'circle',
        id: 'step_1',
        x: 100, y: 100,
        radius: 40,
        fill: '#198754',
        label: 'Initiation'
      },
      {
        type: 'rect',
        id: 'step_2',
        x: 300, y: 100,
        width: 107, height: 60,
        rx: 8,
        fill: '#343473',
        label: 'Validation Taux'
      },
      {
        type: 'rect',
        id: 'step_3',
        x: 500, y: 100,
        width: 104, height: 60,
        rx: 8,
        fill: '#343473',
        label: ['Validation', 'Opérationnelle']
      },
      {
        type: 'circle',
        id: 'step_4',
        x: 100, y: 250,
        radius: 40,
        fill: '#dc3545',
        label: 'Exécution'
      },
      {type: 'line', x1: 150, y1: 100, x2: 250, y2: 100},
      {type: 'line', x1: 350, y1: 100, x2: 450, y2: 100},
      {type: 'line', x1: 550, y1: 100, x2: 50, y2: 250}
    ];

    this.svgContent = this.svg.generateSvg(elements);
  }


  // Chargement des workflows
  loadWorkflowsFromStorage() {
    this.savedWorkflows = localStorage.getItem('bci_workflows');
    if (this.savedWorkflows) {
      this.workflows = JSON.parse(this.savedWorkflows);
      console.log("saved workflow : ", this.workflows);
    } else {
      console.log("Workflows not found");
    }
  }

  // Show on the canvas
  showDetailsOnCanvas(workflow: BciWorkflow) {
    this.selectedWorkflow = workflow;
    this.selectedWorkflowId = this.selectedWorkflow.id;

    console.log("selectedWorkflow : ", this.selectedWorkflow);
    console.log("selectedWorkflowId : ", this.selectedWorkflowId);

    this.selectedWorkflowCanvas = this.workflowCanvasData.find((canvas: any) => {
      return canvas.workflowId === this.selectedWorkflow.id;
    })

    console.log("selectedWorkflowCanvas : ", this.selectedWorkflowCanvas)


  }

  goToFichePage() {
    this.router.navigate(['fiche-demande']);
  }
}
