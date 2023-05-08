export * from './CompareNode';
export * from './EvalNode';
export * from './GotoSceneNode';
export * from './OnCollisionNode';
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
export * from './ui/AskQuestionNode';
export * from './ui/ShowMessageNode';

export type NodeType =
  | 'SceneLoad'
  | 'SceneLoop'
  | 'GotoScene'
  | 'OnCollision'
  | 'AskQuestion'
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
  | 'SetMass';
