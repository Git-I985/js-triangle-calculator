// TODO tests
// TODO modules
// TODO deploy on gihub io
// TODO interface
// TODO canvas draw triangle
// TODO TS

Array.prototype.withoutElementAtIndex = function (excludedElementIndex) {
    return this.filter((item, itemIndex) => itemIndex !== excludedElementIndex)
}


Array.prototype.sum = function () {
    return this.reduce((sum, item) => sum + item, 0)
}


Array.prototype.product = function () {
    return this.reduce((sum, item) => sum * item, 1)
}


const square = (number) => Math.pow(number, 2);


const getTriangleAnglesBySides = (sides) => {
    const [a, b, c] = sides;
    return [
        (square(a) + square(c) - square(b)) / (2 * a * c),
        (square(a) + square(b) - square(c)) / (2 * a * b),
        (square(b) + square(c) - square(a)) / (2 * c * b)
    ].map((angleInRadians) => (Math.acos(angleInRadians) * 180) / Math.PI)
}


const triangleValid = (sides) => {
    return sides.every(Boolean)
           && sides.every((side, sideIndex) => side < sides.withoutElementAtIndex(sideIndex).sum());
}

const calculateTriangle = (sides) => {

    if (!triangleValid(sides)) return false;

    const angles = getTriangleAnglesBySides(sides)

    const uniqueSidesCount = new Set(sides).size;

    const triangleSidesType = ({
        3: "разносторонний",
        2: 'равнобедренный',
        1: 'равносторонний'
    }[uniqueSidesCount])

    const triangleAnglesType = angles.includes(90)
                               ? 'прямоугольный'
                               : angles.some(angle => angle > 90)
                                 ? 'тупоугольный'
                                 : 'остроугольный';

    const trianglePerimeter = sides.sum();
    const triangleArea = Math.sqrt((trianglePerimeter / 2) * (sides.map(side => (trianglePerimeter / 2) - side).product()))

    return {
        triangleArea,
        trianglePerimeter,
        triangleAnglesType,
        triangleSidesType
    }
}

document
    .querySelectorAll('input')
    .forEach(input => input
        .addEventListener('keydown', () => {
            document.querySelector('.result').innerHTML = null
        }))

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const sides = [...inputs].map(input => Number(input.value))
    const triangle = calculateTriangle(sides);
    if (!triangle) return alert('Не правильные параметры треугольника!');
    document.querySelector('.result').innerHTML = triangle.triangleSidesType
                                                  + ' ' + triangle.triangleAnglesType
                                                  + ' треугольник с площадью '
                                                  + triangle.triangleArea.toFixed(2)
                                                  + ' и периметром '
                                                  + triangle.trianglePerimeter;
})
