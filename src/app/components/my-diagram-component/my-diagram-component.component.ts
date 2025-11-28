import {Component} from '@angular/core';
import {initializeModel, NgDiagramComponent, provideNgDiagram} from 'ng-diagram';

@Component({
  selector: 'app-my-diagram-component',
  imports: [],
  template: `<h1>Diagramm</h1>`,
  styles:[
    `
      .custom-node {
        background: #fff;
        border: 2px solid #333;
        border-radius: 8px;
        padding: 16px;
        min-width: 200px;
      }
    `,
  ],
})
export class MyDiagramComponentComponent {
  model = initializeModel({
    nodes: [
      {id: '1', position: {x: 100, y: 150}, data: {label: 'Node 1'}},
      {id: '2', position: {x: 400, y: 150}, data: {label: 'Node 2'}},
    ],
    edges: [
      {
        id: '1',
        source: '1',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        target: '2',
        data: {},
      },
    ],
  });
}
