using Oculus.Interaction;
using Oculus.Interaction.HandGrab;
using OculusSampleFramework;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InteractionManager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public OVRManager manager;
    public Camera camera;
    public GameObject envirnoment;

    public void ToggleAR()
    {
        
        if(manager.isInsightPassthroughEnabled)
        {
            manager.isInsightPassthroughEnabled = false;
            camera.clearFlags = CameraClearFlags.Skybox;
            envirnoment.SetActive(true);
        } else {
            envirnoment.SetActive(false);
            camera.clearFlags = CameraClearFlags.SolidColor;
            manager.isInsightPassthroughEnabled = true;
        }
    }
}
