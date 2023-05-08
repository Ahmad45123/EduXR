export * from './CompareNode';
export * from './EvalNode';
export * from './GotoSceneNode';
export * from './properties/GetPositionNode';
export * from './properties/GetRotationNode';
export * from './properties/GetScaleNode';
export * from './properties/SetPositionNode';
export * from './properties/SetRotationNode';
export * from './properties/SetScaleNode';
export * from './properties/SetVisibleNode';
export * from './properties/SetDynamicFrictionNode';
export * from './properties/SetMassNode';
export * from './properties/SetStaticFrictionNode';
export * from './properties/SetBouncinessNode';
export * from './SceneLoadNode';
export * from './SceneLoopNode';
export * from './ui/ShowMessageNode';
export * from './variables/GetVariableNode';
export * from './variables/SetVariableNode';
export * from './ui/SetObjectDescriptionNode';
export * from './EvalStringNode';
export * from './actions/ApplyForceOnObjectNode';
export * from './properties/GetSpeedNode';
export * from './GetTimeSinceLastLoopNode';
export * from './GetElapsedTimeNode';

export type NodeType =
  | 'SceneLoad'
  | 'SceneLoop'
  | 'GotoScene'
  | 'ShowMessage'
  | 'Compare'
  | 'Eval'
  | 'GetPosition'
  | 'GetRotation'
  | 'GetScale'
  | 'SetPosition'
  | 'SetRotation'
  | 'SetScale'
  | 'SetVisible'
  | 'SetBounciness'
  | 'SetStaticFriction'
  | 'SetDynamicFriction'
  | 'SetMass'
  | 'SetObjectDescription'
  | 'GetVariable'
  | 'SetVariable'
  | 'EvalString'
  | 'ApplyForceOnObject'
  | 'GetSpeed'
  | 'GetTimeSinceLastLoopNode'
  | 'GetElapsedTime';
