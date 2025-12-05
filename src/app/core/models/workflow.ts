export const workflowCanvasSVG = [
  {
    id: 1,
    workflowId: "wf_001",
    image: `<svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#343473"></polygon>
        </marker>
      </defs>
      <g transform="translate(100, 100)" data-step-id="step_1" style="cursor: pointer;">
        <circle r="40" cx="0" cy="0" fill="#198754" stroke="#ffffff" stroke-width="2"></circle>
        <text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Initiation
        </text>
      </g>
      <g transform="translate(300, 100)" data-step-id="step_2" style="cursor: pointer;">
        <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff"
              stroke-width="2"></rect>
        <text text-anchor="middle" fill="white" font-size="12" font-weight="bold"
              y="2.8000001907348633">
          <tspan x="0" dy="0">Validation</tspan>
          <tspan x="0" dy="1.2em">Responsable</tspan>
        </text>
      </g>
      <g transform="translate(500, 100)" data-step-id="step_3" style="cursor: pointer;">
        <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff"
              stroke-width="2"></rect>
        <text text-anchor="middle" fill="white" font-size="12" font-weight="bold"
              y="2.8000001907348633">
          <tspan x="0" dy="0">Validation</tspan>
          <tspan x="0" dy="1.2em">Superviseur</tspan>
        </text>
      </g>
      <g transform="translate(100, 250)" data-step-id="step_4" style="cursor: pointer;">
        <circle r="40" cx="0" cy="0" fill="#dc3545" stroke="#ffffff" stroke-width="2"></circle>
        <text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Exécution
        </text>
      </g>
      <line x1="150" y1="100" x2="250" y2="100" stroke="#343473" stroke-width="2"
            marker-end="url(#arrowhead)"></line>
      <line x1="350" y1="100" x2="450" y2="100" stroke="#343473" stroke-width="2"
            marker-end="url(#arrowhead)"></line>
      <line x1="550" y1="100" x2="50" y2="250" stroke="#343473" stroke-width="2"
            marker-end="url(#arrowhead)"></line>
    </svg>`
  },
  {
    id: 2,
    workflowId: "wf_002",
    image: `<svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="#343473"></polygon>
    </marker>
    </defs>
    <g transform="translate(100, 100)" data-step-id="step_1" style="cursor: pointer;"><circle r="40" cx="0" cy="0" fill="#198754" stroke="#ffffff" stroke-width="2"></circle><text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Initiation</text></g><g transform="translate(300, 100)" data-step-id="step_2" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Contrôle</tspan><tspan x="0" dy="1.2em">Technique</tspan></text></g><g transform="translate(500, 100)" data-step-id="step_3" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Conformité</tspan></text></g><g transform="translate(100, 250)" data-step-id="step_4" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Métier</tspan></text></g><g transform="translate(300, 250)" data-step-id="step_5" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Finale</tspan></text></g><g transform="translate(500, 250)" data-step-id="step_6" style="cursor: pointer;"><circle r="40" cx="0" cy="0" fill="#dc3545" stroke="#ffffff" stroke-width="2"></circle><text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Exécution</text></g><line x1="150" y1="100" x2="250" y2="100" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="350" y1="100" x2="450" y2="100" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="550" y1="100" x2="50" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="150" y1="250" x2="250" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="350" y1="250" x2="450" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line></svg>`
  },
  {
    id: 3,
    workflowId: "wf_003",
    image: `<svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="#343473"></polygon>
    </marker>
    </defs>
    <g transform="translate(100, 100)" data-step-id="step_1" style="cursor: pointer;"><circle r="40" cx="0" cy="0" fill="#198754" stroke="#ffffff" stroke-width="2"></circle><text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Initiation</text></g><g transform="translate(300, 100)" data-step-id="step_2" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Contrôle</tspan><tspan x="0" dy="1.2em">Technique</tspan></text></g><g transform="translate(500, 100)" data-step-id="step_3" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Conformité</tspan></text></g><g transform="translate(100, 250)" data-step-id="step_4" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Métier</tspan></text></g><g transform="translate(300, 250)" data-step-id="step_5" style="cursor: pointer;"><rect x="-50" y="-30" width="100" height="60" rx="8" fill="#343473" stroke="#ffffff" stroke-width="2"></rect><text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="2.8000001907348633"><tspan x="0" dy="0">Validation</tspan><tspan x="0" dy="1.2em">Finale</tspan></text></g><g transform="translate(500, 250)" data-step-id="step_6" style="cursor: pointer;"><circle r="40" cx="0" cy="0" fill="#dc3545" stroke="#ffffff" stroke-width="2"></circle><text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Exécution</text></g><line x1="150" y1="100" x2="250" y2="100" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="350" y1="100" x2="450" y2="100" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="550" y1="100" x2="50" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="150" y1="250" x2="250" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line><line x1="350" y1="250" x2="450" y2="250" stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line></svg>`
  },
]
