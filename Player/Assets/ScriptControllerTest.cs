using Oculus.Interaction.Samples;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ScriptControllerTest : MonoBehaviour
{
    public Slider massSlider;
    public TextMeshProUGUI massValue;
    public GameObject theCube;
    
    public Slider frictionSlider;
    public TextMeshProUGUI frictionValue;
    public PhysicMaterial physicsMatrial;

    public Slider forceSlider;
    public TextMeshProUGUI forceValue;

    public GameObject cubeInfo;

    public void OnMassChanged()
    {
        massValue.text = massSlider.value.ToString("0.00") + " kg";
        theCube.GetComponent<Rigidbody>().mass = massSlider.value;
    }


    public void OnFrictionChange()
    {
        frictionValue.text = (frictionSlider.value / 1000).ToString("0.000");
        physicsMatrial.staticFriction = frictionSlider.value / 1000;
        physicsMatrial.dynamicFriction = frictionSlider.value / 1000;
    }

    public void OnForceChange()
    {
        forceValue.text = forceSlider.value.ToString("0.00") + " N";
    }

    public void DoForce()
    {
        theCube.GetComponent<Rigidbody>().AddForce(forceSlider.value, 0, 0);
    }

    Vector3 lastVelocity;
    public void FixedUpdate()
    {
        var rigidbody = theCube.GetComponent<Rigidbody>();
        var acceleration = (rigidbody.velocity - lastVelocity) / Time.fixedDeltaTime;
        lastVelocity = rigidbody.velocity;

        var cubeInfoText = cubeInfo.GetComponent<TextMeshPro>();
        cubeInfoText.text = "Velocity: " + lastVelocity.magnitude.ToString("0.00") + " m/s\n";
        cubeInfoText.text += "Accelration: " + acceleration.magnitude.ToString("0.00") + " m/s^2";

        cubeInfo.transform.LookAt(Camera.main.transform);
    }
}
