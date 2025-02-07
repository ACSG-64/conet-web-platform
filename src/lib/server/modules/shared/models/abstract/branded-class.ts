/**
 * This abstract class requires the implementing classes to
 * create a simple branded type to avoid structural typing.
 * This is especially useful if classes implement logic in the
 * constructor and need to be differentiated from classes whose
 * structural definitions are the same
 */
export abstract class BrandedClass {
    protected abstract __brand: void;
}
