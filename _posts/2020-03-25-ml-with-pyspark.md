---
title: Machine Learning with PySpark
date: 2020-03-25 21:50:00 +09:00
categories:
- ai
layout: post
comments: true
---

You can see the whole tutorial [here](https://www.guru99.com/pyspark-tutorial.html).

## Setup

```python
from pyspark import SparkContext
from pyspark.sql import SQLContext
from pyspark import SparkFiles
from pyspark.sql.functions import desc
from pyspark.ml import Pipeline
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pyspark.ml.feature import OneHotEncoderEstimator, StringIndexer, VectorAssembler
from pyspark.ml.linalg import DenseVector
```

```python
sc = SparkContext()
sqlContext = SQLContext(sc)
```

## Load

```python
url = "https://raw.githubusercontent.com/guru99-edu/R-Programming/master/adult_data.csv"
```

```python
sc.addFile(url)
sqlContext = SQLContext(sc)
```

```python
df = sqlContext.read.csv(SparkFiles.get("adult_data.csv"), header=True, inferSchema=True)
```

```python
df.printSchema()
```

```text
    root
     |-- x: integer (nullable = true)
     |-- age: integer (nullable = true)
     |-- workclass: string (nullable = true)
     |-- fnlwgt: integer (nullable = true)
     |-- education: string (nullable = true)
     |-- educational-num: integer (nullable = true)
     |-- marital-status: string (nullable = true)
     |-- occupation: string (nullable = true)
     |-- relationship: string (nullable = true)
     |-- race: string (nullable = true)
     |-- gender: string (nullable = true)
     |-- capital-gain: integer (nullable = true)
     |-- capital-loss: integer (nullable = true)
     |-- hours-per-week: integer (nullable = true)
     |-- native-country: string (nullable = true)
     |-- income: string (nullable = true)
```

```python
def get_indexed_column_name(name):
    return f"{name}_Indexed"
def get_class_vec_column_name(name):
    return f"{name}_classVec"

TARGET = 'income'
TARGET_INDEXED = get_indexed_column_name(TARGET)
NUMERICAL_INPUT_COLUMNS = ['age', 'fnlwgt', 'educational-num', 'capital-gain', 'capital-loss', 'hours-per-week']
CATEGORICAL_INPUT_COLUMNS = ['workclass', 'education', 'marital-status', 'occupation', 'relationship', 'race', 'gender', 'native-country']
CATEGORICAL_COLUMNS = CATEGORICAL_INPUT_COLUMNS + [TARGET]
INPUT_VECTOR = "features"
```

```python
for c in CATEGORICAL_COLUMNS:
    df.groupby(c).agg({c: 'count'}).sort(desc(f'count({c})')).show(100)
```

```text
    +----------------+----------------+
    |       workclass|count(workclass)|
    +----------------+----------------+
    |         Private|           33906|
    |Self-emp-not-inc|            3862|
    |       Local-gov|            3136|
    |               ?|            2799|
    |       State-gov|            1981|
    |    Self-emp-inc|            1695|
    |     Federal-gov|            1432|
    |     Without-pay|              21|
    |    Never-worked|              10|
    +----------------+----------------+

    +------------+----------------+
    |   education|count(education)|
    +------------+----------------+
    |     HS-grad|           15784|
    |Some-college|           10878|
    |   Bachelors|            8025|
    |     Masters|            2657|
    |   Assoc-voc|            2061|
    |        11th|            1812|
    |  Assoc-acdm|            1601|
    |        10th|            1389|
    |     7th-8th|             955|
    | Prof-school|             834|
    |         9th|             756|
    |        12th|             657|
    |   Doctorate|             594|
    |     5th-6th|             509|
    |     1st-4th|             247|
    |   Preschool|              83|
    +------------+----------------+

    +--------------------+---------------------+
    |      marital-status|count(marital-status)|
    +--------------------+---------------------+
    |  Married-civ-spouse|                22379|
    |       Never-married|                16117|
    |            Divorced|                 6633|
    |           Separated|                 1530|
    |             Widowed|                 1518|
    |Married-spouse-ab...|                  628|
    |   Married-AF-spouse|                   37|
    +--------------------+---------------------+

    +-----------------+-----------------+
    |       occupation|count(occupation)|
    +-----------------+-----------------+
    |   Prof-specialty|             6172|
    |     Craft-repair|             6112|
    |  Exec-managerial|             6086|
    |     Adm-clerical|             5611|
    |            Sales|             5504|
    |    Other-service|             4923|
    |Machine-op-inspct|             3022|
    |                ?|             2809|
    | Transport-moving|             2355|
    |Handlers-cleaners|             2072|
    |  Farming-fishing|             1490|
    |     Tech-support|             1446|
    |  Protective-serv|              983|
    |  Priv-house-serv|              242|
    |     Armed-Forces|               15|
    +-----------------+-----------------+

    +--------------+-------------------+
    |  relationship|count(relationship)|
    +--------------+-------------------+
    |       Husband|              19716|
    | Not-in-family|              12583|
    |     Own-child|               7581|
    |     Unmarried|               5125|
    |          Wife|               2331|
    |Other-relative|               1506|
    +--------------+-------------------+

    +------------------+-----------+
    |              race|count(race)|
    +------------------+-----------+
    |             White|      41762|
    |             Black|       4685|
    |Asian-Pac-Islander|       1519|
    |Amer-Indian-Eskimo|        470|
    |             Other|        406|
    +------------------+-----------+

    +------+-------------+
    |gender|count(gender)|
    +------+-------------+
    |  Male|        32650|
    |Female|        16192|
    +------+-------------+

    +--------------------+---------------------+
    |      native-country|count(native-country)|
    +--------------------+---------------------+
    |       United-States|                43832|
    |              Mexico|                  951|
    |                   ?|                  857|
    |         Philippines|                  295|
    |             Germany|                  206|
    |         Puerto-Rico|                  184|
    |              Canada|                  182|
    |         El-Salvador|                  155|
    |               India|                  151|
    |                Cuba|                  138|
    |             England|                  127|
    |               China|                  122|
    |               South|                  115|
    |             Jamaica|                  106|
    |               Italy|                  105|
    |  Dominican-Republic|                  103|
    |               Japan|                   92|
    |           Guatemala|                   88|
    |              Poland|                   87|
    |             Vietnam|                   86|
    |            Columbia|                   85|
    |               Haiti|                   75|
    |            Portugal|                   67|
    |              Taiwan|                   65|
    |                Iran|                   59|
    |              Greece|                   49|
    |           Nicaragua|                   49|
    |                Peru|                   46|
    |             Ecuador|                   45|
    |              France|                   38|
    |             Ireland|                   37|
    |                Hong|                   30|
    |            Thailand|                   30|
    |            Cambodia|                   28|
    |     Trinadad&Tobago|                   27|
    |                Laos|                   23|
    |Outlying-US(Guam-...|                   23|
    |          Yugoslavia|                   23|
    |            Scotland|                   21|
    |            Honduras|                   20|
    |             Hungary|                   19|
    |  Holand-Netherlands|                    1|
    +--------------------+---------------------+

    +------+-------------+
    |income|count(income)|
    +------+-------------+
    | <=50K|        37155|
    |  >50K|        11687|
    +------+-------------+
```

## Preprocess

```python
stages = []
for c in CATEGORICAL_INPUT_COLUMNS:
    string_indexer = StringIndexer(inputCol=c, outputCol=get_indexed_column_name(c))
    encoder = OneHotEncoderEstimator(inputCols=[string_indexer.getOutputCol()], outputCols=[get_class_vec_column_name(c)])
    stages += [string_indexer, encoder]

target_string_indexer = StringIndexer(inputCol=TARGET, outputCol=TARGET_INDEXED)
stages += [target_string_indexer]

assembler_inputs = NUMERICAL_INPUT_COLUMNS
assembler_inputs += [get_class_vec_column_name(c) for c in CATEGORICAL_INPUT_COLUMNS]
assembler = VectorAssembler(inputCols=assembler_inputs, outputCol=INPUT_VECTOR)
stages += [assembler]

pipeline = Pipeline(stages=stages)
pipeline_model = pipeline.fit(df)
_preprocessed_df = pipeline_model.transform(df)
```

```python
_preprocessed_df.take(1)
```

```text
    [Row(x=1, age=25, workclass='Private', fnlwgt=226802, education='11th', educational-num=7, marital-status='Never-married', occupation='Machine-op-inspct', relationship='Own-child', race='Black', gender='Male', capital-gain=0, capital-loss=0, hours-per-week=40, native-country='United-States', income='<=50K', workclass_Indexed=0.0, workclass_classVec=SparseVector(8, {0: 1.0}), education_Indexed=5.0, education_classVec=SparseVector(15, {5: 1.0}), marital-status_Indexed=1.0, marital-status_classVec=SparseVector(6, {1: 1.0}), occupation_Indexed=6.0, occupation_classVec=SparseVector(14, {6: 1.0}), relationship_Indexed=2.0, relationship_classVec=SparseVector(5, {2: 1.0}), race_Indexed=1.0, race_classVec=SparseVector(4, {1: 1.0}), gender_Indexed=0.0, gender_classVec=SparseVector(1, {0: 1.0}), native-country_Indexed=0.0, native-country_classVec=SparseVector(41, {0: 1.0}), income_Indexed=0.0, features=SparseVector(100, {0: 25.0, 1: 226802.0, 2: 7.0, 5: 40.0, 6: 1.0, 19: 1.0, 30: 1.0, 41: 1.0, 51: 1.0, 55: 1.0, 58: 1.0, 59: 1.0}))]
```

```python
preprocessed_rdd = _preprocessed_df.rdd.map(lambda x: (x[TARGET_INDEXED], DenseVector(x[INPUT_VECTOR])))
preprocessed_df = sqlContext.createDataFrame(preprocessed_rdd, [TARGET_INDEXED, INPUT_VECTOR])
```

```python
preprocessed_df.take(1)
```

```text
    [Row(income_Indexed=0.0, features=DenseVector([25.0, 226802.0, 7.0, 0.0, 0.0, 40.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]))]
```

```python
train_df, test_df = preprocessed_df.randomSplit([.8,.2],seed=0)
```

```python
train_df.groupby(TARGET_INDEXED).agg({TARGET_INDEXED: 'count'}).show()
test_df.groupby(TARGET_INDEXED).agg({TARGET_INDEXED: 'count'}).show()
```

```text
    +--------------+---------------------+
    |income_Indexed|count(income_Indexed)|
    +--------------+---------------------+
    |           0.0|                29686|
    |           1.0|                 9355|
    +--------------+---------------------+

    +--------------+---------------------+
    |income_Indexed|count(income_Indexed)|
    +--------------+---------------------+
    |           0.0|                 7469|
    |           1.0|                 2332|
    +--------------+---------------------+
```

## Train

```python
logistic_regressor = LogisticRegression(labelCol=TARGET_INDEXED,
                        featuresCol=INPUT_VECTOR,
                        maxIter=10,
                        regParam=0.3)

linear_model = logistic_regressor.fit(train_df)
```

```python
print("Coefficients: " + str(linear_model.coefficients))
print("Intercept: " + str(linear_model.intercept))
```

```text
    Coefficients: [0.007076380681875423,1.434854504803602e-07,0.027833178361915865,2.141276171546966e-05,0.00022521209129802312,0.008692387752389463,-0.0657931481088864,-0.15604730620897275,-0.05862233819946083,-0.16833266255180906,-0.12839210433043582,0.1751092641038446,0.17342415048614157,-0.5861999144754788,-0.18297054054136996,-0.0773237178070943,0.22389065442438108,0.37409930583580653,-0.006513832048081921,-0.3100420059805647,0.015172529341001939,-0.35238469479766965,-0.4396823514336955,0.5705641595320317,-0.4064477508723937,-0.236845895740222,0.5643462884323938,-0.3576877375772784,-0.3917931697737697,0.3255858041751837,-0.3472950472272176,-0.21093642453078842,-0.21776922131351806,-0.1447503229783483,-0.15051086280327616,0.1925556388548789,-0.067514105339522,0.2879618437370764,-0.10194857383088804,0.04738243069029646,-0.29756888622414246,-0.2089314821033548,-0.16953300538608856,-0.12707354380714989,-0.3137663196095446,-0.3008264409518111,0.09270764867630348,0.11547678317135855,-0.26911153098899365,0.2731148787431174,-0.19551079802810994,-0.29404324990430913,-0.24892540791757545,0.41651019401218836,-0.06429620561763938,-0.17872757978389772,-0.08009201741302574,-0.25460639649309735,0.1712109034431708,-0.11384908719435775,-0.37978008381069717,-0.16792884073692957,-0.012452940718866646,-0.10063193681118733,-0.37382112350736935,0.07107963111873757,-0.284141498434422,-0.15060768663009097,-0.12071731533355555,0.05223552308047552,-0.2886976282624519,-0.39329745200010907,-0.17752766944289955,0.05180309766601903,-0.4964079297663666,-0.03876514077615395,-0.3366249233827687,-0.13385058728717106,-0.4744893781006085,-0.6298698946039407,-0.21021782699742084,0.04050755918435547,-0.17525205978484376,-0.11074694732839974,-0.102257918866242,-0.44379735848965496,-0.5361436978459279,-0.2773840762007457,0.24659807215010435,0.12871390513359945,-0.3809300136441835,-0.37665884236612857,0.18171241136374425,-0.49095872161870696,0.33246208099330354,-0.38869360768819566,-0.592483185053199,-0.3666813467879076,-0.3574655812435368,0.10270431608486336]
    Intercept: -2.037103790167865
```

## Evaluate

```python
test_predictions = linear_model.transform(test_df)
```

```python
selected = test_predictions.select(TARGET_INDEXED, "prediction", "probability")
selected.show()
```

```text
    +--------------+----------+--------------------+
    |income_Indexed|prediction|         probability|
    +--------------+----------+--------------------+
    |           0.0|       0.0|[0.95726852834158...|
    |           0.0|       0.0|[0.94437538380484...|
    |           0.0|       0.0|[0.93043777514978...|
    |           0.0|       0.0|[0.95784340551731...|
    |           0.0|       0.0|[0.94757158630441...|
    |           0.0|       0.0|[0.94197110963175...|
    |           0.0|       0.0|[0.94066369460643...|
    |           0.0|       0.0|[0.95124730829915...|
    |           0.0|       0.0|[0.95495424540172...|
    |           0.0|       0.0|[0.93113398990765...|
    |           0.0|       0.0|[0.94505076421474...|
    |           0.0|       0.0|[0.93635946859634...|
    |           0.0|       0.0|[0.95275570827159...|
    |           0.0|       0.0|[0.92027640661279...|
    |           0.0|       0.0|[0.94664958308198...|
    |           0.0|       0.0|[0.93442848419163...|
    |           0.0|       0.0|[0.93854964265381...|
    |           0.0|       0.0|[0.94097158160421...|
    |           0.0|       0.0|[0.93622716302565...|
    |           0.0|       0.0|[0.91863353501544...|
    +--------------+----------+--------------------+
    only showing top 20 rows
```

```python
def calculate_accuracy(model, test_df, target, prediction):
    predictions = model.transform(test_df)
    cm = predictions.select(target, prediction)
    return cm.filter(cm[target] == cm[prediction]).count() / cm.count()

acc = calculate_accuracy(linear_model, test_df, TARGET_INDEXED, 'prediction')
print("Model accuracy: %.3f%%" % (acc * 100))
```

```text
    Model accuracy: 82.083%
```

```python
evaluator = BinaryClassificationEvaluator(labelCol=TARGET_INDEXED, rawPredictionCol="rawPrediction")
print(evaluator.evaluate(test_predictions))
print(evaluator.getMetricName())
```

```text
    0.8919755687717266
    areaUnderROC
```
