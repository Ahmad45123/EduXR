using Oculus.Interaction;
using Oculus.Interaction.HandGrab;
using OculusSampleFramework;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InteractionManager : MonoBehaviour
{
    public GameObject capsuleObject;

    // Start is called before the first frame update
    void Start()
    {
        var grabbable = capsuleObject.GetComponent<Grabbable>();
        grabbable.WhenPointerEventRaised += Grabbable_WhenPointerEventRaised;
    }

    private void Grabbable_WhenPointerEventRaised(PointerEvent obj)
    {
        if(obj.Type == PointerEventType.Move)
        {
            
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
