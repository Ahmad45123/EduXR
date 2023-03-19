using Oculus.Interaction;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PersistantLocationHandler : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        var grabable = gameObject.GetComponent<Grabbable>();
        grabable.WhenPointerEventRaised += Grabable_WhenPointerEventRaised;
    }

    private void Grabable_WhenPointerEventRaised(PointerEvent obj)
    {
        if (obj.Type == PointerEventType.Move){
            var oldAnchor = gameObject.GetComponent<OVRSpatialAnchor>();
            if (oldAnchor != null) Destroy(oldAnchor);
            gameObject.AddComponent<OVRSpatialAnchor>();
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
