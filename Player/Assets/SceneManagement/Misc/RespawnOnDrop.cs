using Oculus.Interaction;
using UnityEngine;
using UnityEngine.Events;

public class RespawnOnDrop : MonoBehaviour
{
    [SerializeField]
    private float _yThresholdForRespawn = 0.7f;

    [SerializeField]
    private UnityEvent _whenRespawned = new UnityEvent();

    public UnityEvent WhenRespawned => _whenRespawned;

    // cached starting transform
    private Vector3 _initialPosition;
    private Quaternion _initialRotation;
    private Vector3 _initialScale;

    private TwoGrabFreeTransformer[] _freeTransformers;
    private Rigidbody _rigidBody;

    protected virtual void OnEnable()
    {
        _initialPosition = transform.localPosition;
        _initialRotation = transform.rotation;
        _initialScale = transform.localScale;
        _freeTransformers = GetComponents<TwoGrabFreeTransformer>();
        _rigidBody = GetComponent<Rigidbody>();
    }

    protected virtual void Update()
    {
        if (transform.position.y < _yThresholdForRespawn)
        {
            transform.localPosition = _initialPosition;
            transform.rotation = _initialRotation;
            transform.localScale = _initialScale;

            if (_rigidBody)
            {
                _rigidBody.velocity = Vector3.zero;
                _rigidBody.angularVelocity = Vector3.zero;
            }

            foreach (var freeTransformer in _freeTransformers)
            {
                freeTransformer.MarkAsBaseScale();
            }

            _whenRespawned.Invoke();
        }
    }
}