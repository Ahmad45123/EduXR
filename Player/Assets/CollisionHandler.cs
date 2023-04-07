using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class CollisionHandler : MonoBehaviour
{
    public TextMeshPro textField;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.GetComponent<CollisionHandler>() == null) return;

        // Append to the TextMeshPro textField the collision detailing what collided with what.
        textField.text += this.name + " collided with " + collision.gameObject.name + "\n";
        Debug.Log(this.name + " collided with " + collision.gameObject.name);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
